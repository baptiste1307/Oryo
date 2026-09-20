export function getSignupHref(search: string) {
  const params = new URLSearchParams(search);
  const query = params.toString();

  return query ? `/inscription?${query}` : "/inscription";
}

export function getLoginRedirectUrl(search: string) {
  const searchParams = new URLSearchParams(search);
  const next = searchParams.get("next");
  if (next?.startsWith("/") && !next.startsWith("//")) return next;
  const intent = searchParams.get("intent");

  if (intent === "save-result") {
    return buildRedirectUrl("/saved_calculation", searchParams, [
      "cost",
      "price",
      "targetMargin",
    ]);
  }

  if (intent === "save-quote") {
    return buildRedirectUrl("/dashboard/build_quote", searchParams, [
      "client",
      "prestation",
      "montant",
    ]);
  }

  return "/dashboard";
}

function buildRedirectUrl(
  path: string,
  source: URLSearchParams,
  keys: string[],
) {
  const params = new URLSearchParams();

  keys.forEach((key) => {
    const value = source.get(key);
    if (value !== null) params.set(key, value);
  });

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}
