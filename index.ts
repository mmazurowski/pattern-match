type Matchers = Record<string, (error: Error) => void>;

const match = (e: unknown) => (matchers: Matchers) => {
  for (const key in matchers) {
    if (key === (e as Error).name) {
      matchers[key](e as Error);
    }
  }
};

const PatternMatch = (func: () => void) => {
  let error: unknown = undefined;

  try {
    func();
  } catch (e: unknown) {
    error = e;
  }

  return {
    match: match(error),
  };
};

(() => {
  const fun = () => {
    throw new Error("Reason");
  };

  PatternMatch(fun).match({
    [Error.name]: console.error,
  });
})();
