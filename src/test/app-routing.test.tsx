import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { LEGACY_SECTIONS, SECTION_NAV } from "@/lib/site-navigation";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("keeps the four requested homepage destinations", () => {
    expect(SECTION_NAV.map((section) => section.id)).toEqual(["home", "products", "about", "contact"]);
  });
  it("redirects former showroom and gallery destinations to products", () => {
    expect(LEGACY_SECTIONS.showroom).toBe("products");
    expect(LEGACY_SECTIONS.gallery).toBe("products");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
