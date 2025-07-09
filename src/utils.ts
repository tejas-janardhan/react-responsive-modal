export const isBrowser = typeof window !== "undefined";

export function cx<T>(...args: T[]) {
  let classes = "";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      classes = appendClass(classes, parseValue(arg));
    }
  }

  return classes;
}

function parseValue<T>(arg: T) {
  if (!arg) {
    return "";
  }
  if (typeof arg === "string") {
    return arg;
  }

  if (typeof arg !== "object") {
    return "";
  }

  if (Array.isArray(arg)) {
    return cx.apply(null, arg);
  }

  if (
    (arg as any).toString !== Object.prototype.toString &&
    !(arg as any).toString.toString().includes("[native code]")
  ) {
    return (arg as any).toString();
  }

  let classes = "";

  Object.keys(arg).forEach((key) => {
    if (arg[key as Extract<keyof T, string>]) {
      classes = appendClass(classes, key);
    }
  });

  return classes;
}

function appendClass(value: string, newClass?: string) {
  if (!newClass) {
    return value;
  }
  return value ? value + " " + newClass : newClass;
}
