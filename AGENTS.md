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

- Keep furniture catalogue data and unconfirmed commercial fields in a browser-safe shared module so catalogue, enquiries and 3D selection stay synchronized.
- Preserve the existing React Three Fiber viewer module and camera controls; furniture is generated with explicit detailed geometry because the requested steel furniture designs have no provided model assets.
- Read 3D material colors from global semantic CSS tokens so the showroom follows the brand theme.
- Keep the public experience on one homepage with hash-based section navigation; legacy content URLs redirect to the matching section so published links remain usable.
- Reuse Showroom for the featured hero and accessible catalogue dialogs only; preserve existing quote modules without exposing forms in the public contact section.
- Quote requests use a public insert-only Cloud table with shared client/server schema validation and a database item validator; no customer quote data is publicly readable.
- Save quotes through a public server function using a publishable RLS-scoped client, never privileged credentials; notification delivery requires verified contact configuration.
- Use actual renders of the implemented furniture models for catalogue thumbnails; clearly label generated styling imagery and model previews as illustrative, not verified stock.
