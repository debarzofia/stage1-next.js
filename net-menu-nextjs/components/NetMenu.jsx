import Script from "next/script";
import { menuMarkup } from "../lib/menu-markup";

/**
 * NEXT.JS MENU COMPONENT
 * This component preserves the original design and HTML data attributes.
 * Menu content, language switching, cart, and popup behavior live in public/menu.js.
 * The DOM below is intentionally not re-rendered after menu.js initializes.
 */
export default function NetMenu() {
  return (
    <>
      <div id="net-app" dangerouslySetInnerHTML={{ __html: menuMarkup }} />
      <Script src="/menu.js" strategy="afterInteractive" />
    </>
  );
}
