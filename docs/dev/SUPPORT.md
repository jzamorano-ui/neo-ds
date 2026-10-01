# Support and deprecation

**Who it is for:** dev, before depending on Neo. **Ships**: yes.

What Neo promises from one version to the next, how long an old name keeps working, which versions of
React and Material UI it supports, who to tell when something fails, and what to do when Neo does not
have what a screen needs.

## Versions

Neo follows Semantic Versioning, counted on what you can use: the exports, the props and their values,
the tokens, the CSS classes and the icon ids.

| the change | the version |
|---|---|
| something you use is removed or renamed —a component, a prop, a value, a token, a class, an icon id— or a `Neo*` signature changes | MAJOR |
| something is added —a component, a prop, a value, a token, an icon— or the supported range of a peer widens | MINOR |
| a fix that adds nothing and removes nothing | PATCH |

Release candidates (`-rc.N`) are published under the `next` tag and final versions under `latest`
([Integration](INTEGRATION.md) says how to install each one).

## Deprecation

A deprecated name keeps working until the next MAJOR. Inside a `Neo*`, an old prop or an old icon id
still draws, and in development the console warns once with the name to write instead.

The aliases left by the move to English keep working throughout 1.x and are removed in 2.0.0.

## Supported versions

React 18 and 19 with Material UI `>=5.18.0 <7`. The combinations that were measured, and the ones that
break, are in the table of [Integration](INTEGRATION.md#react-material-ui-and-emotion-in-versions-that-work).
Material UI 7 and later are not supported by 1.0.0; widening the range comes later, as a 1.x MINOR.

## Reporting a problem

Tell the Neo maintainer through the UX-Esencial team channel, with:

- the installed versions: `npm ls @neo-design/mui @neo-design/foundations @mui/material react`;
- the component and the props you passed;
- what you expected, and what you saw.

## When Neo does not have what you need

The system has no table, sidebar, progress bar or avatar; what it does have is in
[`COMPONENT-MAP.md`](COMPONENT-MAP.md). What to do depends on where the need comes from:

| the need | what to do |
|---|---|
| **no design delivered it** | use the Material UI component with Neo's theme mounted, and do not restyle it by hand |
| **a design delivered it, and the library does not have it yet** | build it in your app with the semantic tokens its design names —[`TOKENS-GUIDE.md`](TOKENS-GUIDE.md) says which one fits each intention—, never with a hex value or a primitive |
