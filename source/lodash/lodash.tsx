export function lodashHas<T>(obj: T, path: string): boolean {
  return path
    .split('.')
    .every(key => (obj = (obj as any)?.[key]) !== undefined);
}

export function lodashGet<T, R = unknown>(
  obj: T,
  path: string,
  defaultValue?: R,
): R {
  return (
    path.split('.').reduce<any>((acc, key) => acc?.[key], obj) ?? defaultValue
  );
}

export function lodashSet<T extends object, V>(
  obj: T,
  path: string,
  value: V,
): T {
  set(obj, path, value);
  return obj;
}

function set(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
  });

  return obj;
}
