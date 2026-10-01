<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the waitlist experience as a single client-side state transition on the home route, because the submitted view replaces the form without navigation.
- Load app-specific fonts as CDN assets with CSS font faces, because the visual match depends on typography unavailable from standard web-font libraries.
- Keep the supplied SNIFDIT logo as a transparent CDN image and reuse its shape for the favicon, because the custom lettering cannot be reliably recreated with a font fallback.
