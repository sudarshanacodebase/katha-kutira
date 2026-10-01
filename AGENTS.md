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

- Keep story catalogue content in `src/lib/stories.ts` as reusable structured data so listing and detail views remain consistent.
- Every story catalogue entry includes its narration text alongside metadata so text and audio always use the same canonical source.
- Keep website interface translations in the shared i18n dictionary/provider; leave story catalogue titles, descriptions, and narration unchanged so language selection changes only site text.
