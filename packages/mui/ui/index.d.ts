// packages/mui/ui/index.d.ts — GENERATED, do not edit by hand.
// 
//
// THE REFERENCE BELOW IS NOT DECORATIVE. `package.json` points `types` at this file, and
// TypeScript only loads what it REACHES from there: a loose .d.ts inside the package is not read. The
// augmentations over MUI —the `theme.neo.*` node, the `xxl` breakpoint, `color="brand"` and the 22
// Typography variants— live in theme/neo.d.ts, and without this line NONE of that exists for the
// consumer: everything EXAMPLES.md and TOKENS-GUIDE.md teach would be a compile error.
/// <reference path="../theme/neo.d.ts" />
import type { ReactNode, ReactElement, ForwardRefExoticComponent, RefAttributes, Ref, ChangeEvent, SyntheticEvent, MouseEvent, HTMLAttributes } from 'react';
import type { SxProps, Theme, ThemeOptions } from '@mui/material/styles';
import type { AlertProps, AutocompleteProps, BadgeProps, ButtonProps, CheckboxProps, ChipProps, CircularProgressProps, DialogProps, DrawerProps, IconButtonProps, LinkProps, MenuProps, OutlinedInputProps, RadioProps, RadioGroupProps, SelectProps, SnackbarProps, SwipeableDrawerProps, SwitchProps, TabsProps, TooltipProps } from '@mui/material';

/** A handler checked bivariantly, the way React types its own event handlers: one typed with MUI's type still fits. */
type NeoHandler<A extends unknown[]> = { bivarianceHack(...args: A): void }['bivarianceHack'];

/** Ready-made MUI theme — mount it ONCE with ThemeProvider + CssBaseline. Also in `@neo-design/mui/theme`. */
export declare const theme: Theme;
export declare const themeOptions: ThemeOptions;

/** The tokens in JavaScript, for `sx` and `styled`: `color` (role → hex), `colorVars` (role → `var(--…)`), `cssVar` and `scale`. */
export { color, colorVars, cssVar, scale } from '@neo-design/foundations/tokens/api-js.mjs';

/** Communicates system messages the user needs to read. NO: Not for decoration or for navigation states. For the state of an element it is `badge`; for a classification it is `tag`. */
export interface NeoAlertProps extends Partial<Omit<AlertProps, 'type' | 'title' | 'children' | 'onClose' | 'className' | 'sx' | 'severity' | 'ref'>> {
  /** the semantic nature of the message — the color, the icon and the ARIA role derive from it (C6) Default: 'info'. */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title?: ReactNode;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** The close handler. Its presence draws the ✕. */
  onClose?: (event: SyntheticEvent) => void;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoAlert: ForwardRefExoticComponent<NeoAlertProps & RefAttributes<HTMLElement>>;

/** Fixes the proportion (width : height) of the content and keeps it when the size changes. NO: It is not for text content or for layout: it fixes a proportion, not a layout. It is not interactive. */
export interface NeoAspectRatioProps extends Partial<Omit<HTMLAttributes<HTMLElement>, 'ratio' | 'contain' | 'src' | 'alt' | 'className' | 'children' | 'ref'>> {
  /** how much space it takes. The width adapts to what is available and the height comes from here. Default: '16/9'. */
  ratio?: '1/1' | '16/9' | '4/3' | '3/4' | '21/9';
  /** The image fits whole instead of being cropped. Only when cropping loses information. */
  contain?: boolean;
  /** The image: a URL or a data URI. It realizes the image slot of the master; it goes in with `object-fit: cover`. */
  src?: string;
  /** The alternative text of the image. Empty when it is decorative and the message is already in the text (banner); descriptive when the image IS the content (aspect-ratio). */
  alt?: string;
  /** Extra classes on the root. They add to the system ones; they do not replace them. */
  className?: string;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
}
export declare const NeoAspectRatio: ForwardRefExoticComponent<NeoAspectRatioProps & RefAttributes<HTMLElement>>;

/** Communicates system state or an activity count, compactly. NO: If it classifies instead of reporting a state it is `tag`. If the message needs to be read in full it is `alert`. It is never interactive. */
export interface NeoBadgeProps extends Partial<Omit<BadgeProps, 'type' | 'label' | 'count' | 'children' | 'className' | 'sx' | 'component' | 'variant' | 'color' | 'ref'>> {
  /** what kind of badge it is. The first TWO are indicators (MUI Badge) and the next five are semantic states (Chip variant=status) — the axis picks the base, not a variant. Default: 'dot'. */
  type?: 'dot' | 'number' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
  /** The visible text of the component. */
  label?: ReactNode;
  /** The number shown. It needs an `aria-label` that says it in words. */
  count?: number;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoBadge: ForwardRefExoticComponent<NeoBadgeProps & ({ type?: 'dot' | 'number'; 'aria-label': string; children: ReactNode } | { type: 'neutral' | 'info' | 'success' | 'warning' | 'error'; label: ReactNode }) & RefAttributes<HTMLElement>>;

/** Highlights a message within the page —a campaign, a benefit, a notice— with or without an action. NO: It is NOT system feedback: confirmations and errors are `alert`. The banner promotes, it does not notify. */
export interface NeoBannerProps extends Partial<Omit<HTMLAttributes<HTMLElement>, 'size' | 'fullPhoto' | 'title' | 'subtitle' | 'description' | 'icon' | 'media' | 'src' | 'alt' | 'mediaPosition' | 'actions' | 'aria-label' | 'className' | 'ref'>> {
  /** sets the height. The width is set by the container (C10). Default: 'large'. */
  size?: 'small' | 'medium' | 'large';
  /** the image becomes the background, with an overlay Default: 'false'. */
  fullPhoto?: boolean;
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title?: ReactNode;
  /** The secondary text, under the title. */
  subtitle?: ReactNode;
  /** The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node. */
  description: ReactNode;
  /** The icon node. Use the system icons (icons/), not loose SVGs. */
  icon?: ReactNode;
  /** A node of your own for the banner image (video, picture). The main path is `src`; if both are given, `src` wins. */
  media?: ReactNode;
  /** The image: a URL or a data URI. It realizes the image slot of the master; it goes in with `object-fit: cover`. */
  src?: string;
  /** The alternative text of the image. Empty when it is decorative and the message is already in the text (banner); descriptive when the image IS the content (aspect-ratio). */
  alt?: string;
  /** Which side the image goes on. It only applies with `size="small"`: in the other sizes it does not go to the side. */
  mediaPosition?: 'right' | 'left';
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** The accessible name when there is no visible text that provides it. */
  'aria-label'?: string;
  /** Extra classes on the root. They add to the system ones; they do not replace them. */
  className?: string;
}
export declare const NeoBanner: ForwardRefExoticComponent<NeoBannerProps & ({ title: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Rises from the bottom edge on mobile with complementary content that can wait, or a short task, while the person can still see and return to the page underneath. NO: If the content demands a decision, or reports an error the person has to resolve, it is `modal-dialog`. If it is a long task or dense information, it is `modal-fullscreen`. On desktop the same content moves to a lateral drawer: the sheet is mobile-only. */
export interface NeoBottomSheetProps extends Partial<Omit<SwipeableDrawerProps, 'open' | 'onClose' | 'title' | 'image' | 'actions' | 'children' | 'className' | 'sx' | 'ref'>> {
  /** The panel or the bubble, open (controlled). */
  open?: boolean;
  /** The close handler. Its presence draws the ✕. */
  onClose?: (...args: unknown[]) => void;
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title?: ReactNode;
  /**  */
  image?: ReactNode;
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoBottomSheet: ForwardRefExoticComponent<NeoBottomSheetProps & ({ title: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Runs actions. NO: To navigate it is `link`; for an on/off option it is `toggle`. */
export interface NeoButtonProps extends Partial<Omit<ButtonProps, 'family' | 'variant' | 'surface' | 'size' | 'label' | 'iconLeft' | 'iconRight' | 'loading' | 'disabled' | 'children' | 'className' | 'sx' | 'color' | 'ref'>> {
  /** semantic family Default: 'system'. */
  family?: 'system' | 'brand';
  /** visual hierarchy Default: 'primary'. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** the surface it sits on Default: 'default'. */
  surface?: 'default' | 'inverse';
  /** size adjustment Default: 'large'. */
  size?: 'small' | 'medium' | 'large';
  /** The visible text of the component. */
  label?: ReactNode;
  /**  */
  iconLeft?: string | ReactElement;
  /**  */
  iconRight?: string | ReactElement;
  /** loading */
  loading?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** The visible text, as MUI `children` —the same as `label`. One of the two is required: without either the control has no name. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoButton: ForwardRefExoticComponent<NeoButtonProps & ({ label: ReactNode } | { children: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Runs an action that is understood by its icon: close, back, add, more options. NO: If the action needs explaining, it is a `button` with a label. Without visible text there is NO accessible name: the `aria-label` is required, not an optional decoration. */
export interface NeoButtonIconProps extends Partial<Omit<IconButtonProps, 'family' | 'variant' | 'size' | 'surface' | 'disabled' | 'className' | 'sx' | 'color' | 'ref'>> {
  /** semantic family — the same as `button` Default: 'system'. */
  family?: 'system' | 'brand';
  /** visual hierarchy Default: 'primary'. */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** size adjustment — the button is SQUARE: 32 · 40 · 48, and the glyph scales with it (16 · 20 · 24) Default: 'large'. */
  size?: 'small' | 'medium' | 'large';
  /** the surface it sits on Default: 'default'. */
  surface?: 'default' | 'inverse';
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoButtonIcon: ForwardRefExoticComponent<NeoButtonIconProps & ({ 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Multiple, independent selection. NO: If the selection is exclusive it is `radio-button`. If the change applies instantly without saving, it is `toggle`. */
export interface NeoCheckboxProps extends Partial<Omit<CheckboxProps, 'label' | 'checked' | 'defaultChecked' | 'indeterminate' | 'disabled' | 'onChange' | 'id' | 'hideLabel' | 'inputRef' | 'className' | 'sx' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** On. */
  checked?: boolean;
  /**  */
  defaultChecked?: boolean;
  /** Neither checked nor unchecked: the state of a parent whose children are mixed. */
  indeterminate?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Notifies the value change. */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** Hides the label from view and keeps it for screen readers: the control still has a name. It is `text=false` in the master. */
  hideLabel?: boolean;
  /** The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control. */
  inputRef?: Ref<unknown>;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoCheckbox: ForwardRefExoticComponent<NeoCheckboxProps & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Compact interactive filter or selection within the same view. NO: To navigate between sections it is `tabs`. For system states it is `badge`. For a classification nobody touches it is `tag`. */
export interface NeoChipsProps extends Partial<Omit<ChipProps, 'label' | 'icon' | 'selected' | 'disabled' | 'className' | 'sx' | 'ref'>> {
  /** The visible text of the component. */
  label: ReactNode;
  /** The icon node. Use the system icons (icons/), not loose SVGs. */
  icon?: ReactNode;
  /** Selected (drawn filled). In the DOM it goes as data-selected. */
  selected?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoChips: ForwardRefExoticComponent<NeoChipsProps & RefAttributes<HTMLElement>>;

/** A row of related chips chosen together: several at once, or one at a time. NO: A single filter is `chips`. To move between sections it is `tabs`. An exclusive choice that is not a filter of the view is `radio-button`. */
export interface NeoChipsGroupProps extends Partial<Omit<RadioGroupProps, 'selection' | 'options' | 'value' | 'defaultValue' | 'disabled' | 'onChange' | 'className' | 'sx' | 'ref'>> {
  /** Whether several chips can be on at once (`multiple`) or only one (`single`). It is behaviour: the master draws the same row for both. Default: 'single'. */
  selection?: 'multiple' | 'single';
  /** The list options. Closed and strict: values outside it are not accepted. */
  options?: ReadonlyArray<{ label: string; value: string; disabled?: boolean }>;
  /** The controlled value. */
  value?: string | ReadonlyArray<string>;
  /** The initial, uncontrolled value. */
  defaultValue?: string | ReadonlyArray<string>;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Notifies the value change. */
  onChange?: (event: SyntheticEvent, value: string | string[]) => void;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoChipsGroup: ForwardRefExoticComponent<NeoChipsGroupProps & ({ 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Single selection from a list filterable by text: you type and the list narrows down to the matches. NO: Without search it is `select`. For free text it is `text-field`. For running actions, `menu`. */
export interface NeoComboboxProps<T = string, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false> extends Partial<Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'label' | 'required' | 'helperText' | 'error' | 'readOnly' | 'disabled' | 'tooltip' | 'iconLeft' | 'iconRight' | 'tooltipLabel' | 'id' | 'placeholder' | 'options' | 'onChange' | 'className' | 'sx' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** The field is required. */
  required?: boolean;
  /** The help text under the field. In `error` this same slot says the error message: they are not two. */
  helperText?: ReactNode;
  /** The value does not pass validation. The message goes in the same `helperText` slot. */
  error?: boolean;
  /** It can be read but not edited. */
  readOnly?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it. */
  tooltip?: ReactNode;
  /**  */
  iconLeft?: string | ReactElement;
  /**  */
  iconRight?: string | ReactElement;
  /** The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well. */
  tooltipLabel?: string;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** The hint text inside the field. It never replaces the label, which is visible and static. */
  placeholder?: string;
  /** The list options. Closed and strict: values outside it are not accepted. */
  options?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['options'];
  /** Notifies the value change. */
  onChange?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['onChange'];
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoCombobox: <T = string, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>(props: NeoComboboxProps<T, Multiple, DisableClearable, FreeSolo> & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>) => ReactElement | null;

/** Enters from the right edge on the web with complementary or extensive content that the person opens on demand, while the page underneath stays in view. NO: If the content demands a decision, or reports an error the person has to resolve, it is `modal-dialog`. If it is a long task with steps, it is `modal-fullscreen`. On mobile the same content goes in a `bottom-sheet`: the drawer is web-only. */
export interface NeoDrawerProps extends Partial<Omit<DrawerProps, 'open' | 'onClose' | 'title' | 'image' | 'actions' | 'children' | 'className' | 'sx' | 'ref'>> {
  /** The panel or the bubble, open (controlled). */
  open?: boolean;
  /** The close handler. Its presence draws the ✕. */
  onClose?: (...args: unknown[]) => void;
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title: ReactNode;
  /**  */
  image?: ReactNode;
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoDrawer: ForwardRefExoticComponent<NeoDrawerProps & RefAttributes<HTMLElement>>;

/** Takes the place of content that does not exist yet and says what can be done about it. NO: To communicate something that just happened, which is `alert`. For the wait while data loads, which is `spinner`: empty and loading are not the same, and mixing them up leaves the person waiting for something that is not coming. */
export interface NeoEmptyStateProps extends Partial<Omit<HTMLAttributes<HTMLElement>, 'icon' | 'title' | 'description' | 'actions' | 'headingLevel' | 'className' | 'ref'>> {
  /** The icon node. Use the system icons (icons/), not loose SVGs. */
  icon: ReactNode;
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title: ReactNode;
  /** The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node. */
  description: ReactNode;
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** The heading level of the title. The screen decides it: `h2` on a page, `h3` inside a section that already has its own title. Skipping levels breaks navigation by headings. Default: 'h2'. */
  headingLevel?: 'h2' | 'h3' | 'h4';
  /** Extra classes on the root. They add to the system ones; they do not replace them. */
  className?: string;
}
export declare const NeoEmptyState: ForwardRefExoticComponent<NeoEmptyStateProps & RefAttributes<HTMLElement>>;

/** Takes the person somewhere else. NO: If the action makes something happen (save, send, open a dialog) it is `button`. A link that does not navigate lies about what is going to happen. */
export interface NeoLinkProps extends Partial<Omit<LinkProps, 'label' | 'disabled' | 'children' | 'className' | 'sx' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** The visible text, as MUI `children` —the same as `label`. One of the two is required: without either the control has no name. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoLink: ForwardRefExoticComponent<NeoLinkProps & RefAttributes<HTMLElement>>;

/** Public floating-list primitive: the reusable panel of options. NO: It is not used on its own: without a trigger nothing opens it. `select` and `combobox` consume it with the `listbox` role, and action menus with the native `menu` role. */
export interface NeoMenuProps extends Partial<Omit<MenuProps, 'trigger' | 'items' | 'aria-label' | 'defaultOpen' | 'open' | 'onClose' | 'disabled' | 'className' | 'sx' | 'ref'>> {
  /** The trigger that opens the panel. It is EXTERNAL: any element works. */
  trigger: ReactElement;
  /** The pieces of a composite: each one with its value, its label and its content. */
  items?: Array<{ value?: string; label?: ReactNode; icon?: string | ReactElement; disabled?: boolean; divider?: boolean; onSelect?: (value: string) => void }>;
  /** The accessible name when there is no visible text that provides it. */
  'aria-label'?: string;
  /** The panel starts open and the component handles it afterwards. It is the UNCONTROLLED version of `open`: useful to document or capture the open panel without holding the state from outside. */
  defaultOpen?: boolean;
  /** The panel or the bubble, open (controlled). */
  open?: boolean;
  /** The close handler. Its presence draws the ✕. */
  onClose?: NeoHandler<[event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'tabKeyDown']>;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoMenu: ForwardRefExoticComponent<NeoMenuProps & RefAttributes<HTMLElement>>;

/** Interrupts the flow to ask for a decision or an answer. NO: If the content needs scrolling or several steps, the case is not a dialog: it is `modal-fullscreen`. */
export interface NeoModalDialogProps extends Partial<Omit<DialogProps, 'open' | 'onClose' | 'title' | 'description' | 'size' | 'type' | 'closable' | 'actions' | 'children' | 'className' | 'sx' | 'maxWidth' | 'ref'>> {
  /** The panel or the bubble, open (controlled). */
  open?: boolean;
  /** The close handler. Its presence draws the ✕. */
  onClose?: NeoHandler<[event: {}, reason?: 'backdropClick' | 'escapeKeyDown']>;
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title: ReactNode;
  /** The description. It is a prop and not a loose paragraph: `aria-describedby` needs a stable node. */
  description?: ReactNode;
  /** how large the dialog is: 343 · 600 · 900 · 1200 of maximum width, constants from the master and not the breakpoint scale. It also scales the horizontal gutter (16 · 24 · 24 · 32). Default: 'xs'. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** what the dialog is about — the header background, the title color and the icon come from it, and the icon is NOT a prop but is derived (C6) Default: 'default'. */
  type?: 'default' | 'brand' | 'info' | 'success' | 'warning' | 'error';
  /** Draws the ✕. It needs `onClose` to do anything. */
  closable?: boolean;
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoModalDialog: ForwardRefExoticComponent<NeoModalDialogProps & RefAttributes<HTMLElement>>;

/** Takes over the whole screen for dense information or a long task, without losing the point of origin. NO: If the content is short and asks for a decision, the case is not a full-screen: it is `modal-dialog`. */
export interface NeoModalFullscreenProps extends Partial<Omit<DialogProps, 'open' | 'onClose' | 'onBack' | 'title' | 'actions' | 'children' | 'className' | 'sx' | 'ref'>> {
  /** The panel or the bubble, open (controlled). */
  open?: boolean;
  /** The close handler. Its presence draws the ✕. */
  onClose?: NeoHandler<[event: {}, reason?: 'backdropClick' | 'escapeKeyDown']>;
  /** The back-step handler. */
  onBack?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** The title. It is a prop and not content because `aria-labelledby` anchors to it. */
  title: ReactNode;
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoModalFullscreen: ForwardRefExoticComponent<NeoModalFullscreenProps & RefAttributes<HTMLElement>>;

/** Exclusive selection among mutually exclusive options. NO: If several can be chosen it is `checkbox`. If it is an immediate on/off it is `toggle`. With many options, a `select`. */
export interface NeoRadioButtonProps extends Partial<Omit<RadioProps, 'label' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange' | 'id' | 'hideLabel' | 'inputRef' | 'className' | 'sx' | 'row' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** On. */
  checked?: boolean;
  /**  */
  defaultChecked?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Notifies the value change. */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** Hides the label from view and keeps it for screen readers: the control still has a name. It is `text=false` in the master. */
  hideLabel?: boolean;
  /** The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control. */
  inputRef?: Ref<unknown>;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoRadioButton: ForwardRefExoticComponent<NeoRadioButtonProps & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Exclusive selection among mutually exclusive options. NO: If several can be chosen it is `checkbox`. If it is an immediate on/off it is `toggle`. With many options, a `select`. */
export interface NeoRadioGroupProps extends Partial<Omit<RadioGroupProps, 'name' | 'legend' | 'value' | 'defaultValue' | 'direction' | 'disabled' | 'onChange' | 'children' | 'inputRef' | 'className' | 'sx' | 'row' | 'ref'>> {
  /** The group name: all the controls that exclude each other share it. REQUIRED. */
  name: string;
  /** The text of the group <legend>. REQUIRED: without it the set has no accessible name. */
  legend?: ReactNode;
  /** The controlled value. */
  value?: string;
  /** The initial, uncontrolled value. */
  defaultValue?: string;
  /** how the GROUP's options are laid out. It lives in the group's master, not in the atom. Default: 'vertical'. */
  direction?: 'vertical' | 'horizontal';
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Notifies the value change. */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control. */
  inputRef?: Ref<unknown>;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoRadioGroup: ForwardRefExoticComponent<NeoRadioGroupProps & ({ legend: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Single selection of one option from a predefined set. NO: With 2 options it is `radio-button`. If there are so many that searching helps, `combobox`. For running actions, `menu`. */
export interface NeoSelectProps<Value = unknown> extends Partial<Omit<SelectProps<Value>, 'label' | 'required' | 'helperText' | 'error' | 'readOnly' | 'disabled' | 'tooltip' | 'tooltipLabel' | 'id' | 'placeholder' | 'renderValue' | 'children' | 'className' | 'sx' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** The field is required. */
  required?: boolean;
  /** The help text under the field. In `error` this same slot says the error message: they are not two. */
  helperText?: ReactNode;
  /** The value does not pass validation. The message goes in the same `helperText` slot. */
  error?: boolean;
  /** It can be read but not edited. */
  readOnly?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it. */
  tooltip?: ReactNode;
  /** The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well. */
  tooltipLabel?: string;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** The hint text inside the field. It never replaces the label, which is visible and static. */
  placeholder?: string;
  /** How the chosen value is drawn in the trigger. */
  renderValue?: (valor: unknown) => ReactNode;
  /** The content. Whoever uses the component provides it; in the stories it comes from the minimal example. */
  children?: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoSelect: <Value = unknown>(props: NeoSelectProps<Value> & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>) => ReactElement | null;

/** Communicates, for a moment, the result of an action or a change in the system, without interrupting the task. It floats over the page and goes away on its own. NO: If the message has to STAY until someone reads it, it is `alert`. If it promotes something, it is `banner`. If it demands a decision, it is `modal-dialog`. The distinction from `alert` is a single one and it is measurable: the alert takes up layout and persists; the snackbar takes up no layout and goes away. */
export interface NeoSnackbarProps extends Partial<Omit<SnackbarProps, 'open' | 'onClose' | 'message' | 'actions' | 'closable' | 'className' | 'sx' | 'ref'>> {
  /** The panel or the bubble, open (controlled). */
  open?: boolean;
  /** The close handler. Its presence draws the ✕. */
  onClose?: NeoHandler<[event: SyntheticEvent | Event, reason: 'timeout' | 'clickaway' | 'escapeKeyDown' | 'closeButton']>;
  /**  */
  message: ReactNode;
  /** The call to action. One at most (C1). */
  actions?: ReactNode;
  /** Draws the ✕. It needs `onClose` to do anything. */
  closable?: boolean;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoSnackbar: ForwardRefExoticComponent<NeoSnackbarProps & RefAttributes<HTMLElement>>;

/** Indicator for a brief, localized load. NO: When the whole page is loading — there, show the page's structure while the data arrives. Nor inside an icon-only button, which has no loading state. */
export interface NeoSpinnerProps extends Partial<Omit<CircularProgressProps, 'size' | 'className' | 'sx' | 'ref'>> {
  /** the diameter of the arc, on MUI's long scale. Inside a `button` it is ALWAYS medium. Default: 'small'. */
  size?: 'small' | 'medium' | 'large';
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoSpinner: ForwardRefExoticComponent<NeoSpinnerProps & RefAttributes<HTMLElement>>;

/** Organizes content into sections within a single view. NO: To filter or select items it is `chips`. To navigate between pages it is `link`. */
export interface NeoTabsProps extends Partial<Omit<TabsProps, 'items' | 'value' | 'defaultValue' | 'onChange' | 'aria-label' | 'disabled' | 'className' | 'sx' | 'ref'>> {
  /** The pieces of a composite: each one with its value, its label and its content. */
  items?: Array<{ value: string; label: ReactNode; icon?: string | ReactElement; disabled?: boolean; content?: ReactNode }>;
  /** The controlled value. */
  value?: string;
  /** The initial, uncontrolled value. */
  defaultValue?: string;
  /** Notifies the value change. */
  onChange?: (event: SyntheticEvent, value: string) => void;
  /** The accessible name when there is no visible text that provides it. */
  'aria-label'?: string;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoTabs: ForwardRefExoticComponent<NeoTabsProps & RefAttributes<HTMLElement>>;

/** Informational classification label: which category an element belongs to. NO: If it communicates a system state it is `badge`. If it represents an active selection it is `chips`. */
export interface NeoTagProps extends Partial<Omit<ChipProps, 'tone' | 'label' | 'icon' | 'iconRight' | 'className' | 'sx' | 'ref'>> {
  /** how heavy the tag's fill is: `soft` is the light gray with a stroke, `solid` the dark neutral without a stroke. It is NOT the surface it sits on Default: 'soft'. */
  tone?: 'soft' | 'solid';
  /** The visible text of the component. */
  label: ReactNode;
  /** The icon node. Use the system icons (icons/), not loose SVGs. */
  icon?: ReactNode;
  /**  */
  iconRight?: string | ReactElement;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoTag: ForwardRefExoticComponent<NeoTagProps & RefAttributes<HTMLElement>>;

/** Text input typed by the person. NO: If the value comes from a closed set it is `select`; if the set is long and searching helps, `combobox`. */
export interface NeoTextAreaProps extends Partial<Omit<OutlinedInputProps, 'label' | 'required' | 'helperText' | 'error' | 'readOnly' | 'disabled' | 'tooltip' | 'counter' | 'tooltipLabel' | 'id' | 'inputMode' | 'maxLength' | 'inputProps' | 'value' | 'defaultValue' | 'onChange' | 'minRows' | 'maxRows' | 'rows' | 'inputRef' | 'className' | 'sx' | 'multiline' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** The field is required. */
  required?: boolean;
  /** The help text under the field. In `error` this same slot says the error message: they are not two. */
  helperText?: ReactNode;
  /** The value does not pass validation. The message goes in the same `helperText` slot. */
  error?: boolean;
  /** It can be read but not edited. */
  readOnly?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it. */
  tooltip?: ReactNode;
  /** The counter text. By default the field counts on its own against `maxLength` (written/limit); pass it only to show a different text. */
  counter?: ReactNode;
  /** The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well. */
  tooltipLabel?: string;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** The keyboard a phone opens. It goes to the `<input>`, not to the container. */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** The maximum number of characters the control accepts. It goes to the `<input>`, and the visible counter counts against it: written/limit. */
  maxLength?: number;
  /** Raw attributes for the `<input>`. They win over `inputMode` and `maxLength`, which are the two shortcuts. */
  inputProps?: Record<string, unknown>;
  /** The controlled value. */
  value?: string | number;
  /** The initial, uncontrolled value. */
  defaultValue?: string | number;
  /** Notifies the value change. */
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** The minimum height, in lines: the area starts there and grows with the text. */
  minRows?: number;
  /** The maximum height, in lines: there the area stops growing. */
  maxRows?: number;
  /** A fixed height, in lines: with it the area does not grow, and `minRows` and `maxRows` do not apply. */
  rows?: number;
  /** The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control. */
  inputRef?: Ref<unknown>;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoTextArea: ForwardRefExoticComponent<NeoTextAreaProps & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Text input typed by the person. NO: If the value comes from a closed set it is `select`; if the set is long and searching helps, `combobox`. */
export interface NeoTextFieldProps extends Partial<Omit<OutlinedInputProps, 'label' | 'required' | 'helperText' | 'error' | 'readOnly' | 'disabled' | 'prefix' | 'suffix' | 'tooltip' | 'iconLeft' | 'iconRight' | 'counter' | 'tooltipLabel' | 'startAdornment' | 'endAdornment' | 'id' | 'inputMode' | 'maxLength' | 'inputProps' | 'value' | 'defaultValue' | 'onChange' | 'inputRef' | 'className' | 'sx' | 'multiline' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** The field is required. */
  required?: boolean;
  /** The help text under the field. In `error` this same slot says the error message: they are not two. */
  helperText?: ReactNode;
  /** The value does not pass validation. The message goes in the same `helperText` slot. */
  error?: boolean;
  /** It can be read but not edited. */
  readOnly?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /**  */
  prefix?: ReactNode;
  /**  */
  suffix?: ReactNode;
  /** The help text that the ⓘ next to the label opens. Without it there is no ⓘ: its presence IS the content. The glyph is not chosen — the master sets it. */
  tooltip?: ReactNode;
  /**  */
  iconLeft?: string | ReactElement;
  /**  */
  iconRight?: string | ReactElement;
  /** The counter text. By default the field counts on its own against `maxLength` (written/limit); pass it only to show a different text. */
  counter?: ReactNode;
  /** The accessible name of the ⓘ button. By default «Ayuda sobre <label>» (end-user text, in Spanish); pass it when that phrase does not name the help well. */
  tooltipLabel?: string;
  /** The node that goes before the field, inside the border. */
  startAdornment?: ReactNode;
  /** The node that goes after the field, inside the border. */
  endAdornment?: ReactNode;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** The keyboard a phone opens. It goes to the `<input>`, not to the container. */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** The maximum number of characters the control accepts. It goes to the `<input>`, and the visible counter counts against it: written/limit. */
  maxLength?: number;
  /** Raw attributes for the `<input>`. They win over `inputMode` and `maxLength`, which are the two shortcuts. */
  inputProps?: Record<string, unknown>;
  /** The controlled value. */
  value?: string | number;
  /** The initial, uncontrolled value. */
  defaultValue?: string | number;
  /** Notifies the value change. */
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control. */
  inputRef?: Ref<unknown>;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoTextField: ForwardRefExoticComponent<NeoTextFieldProps & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** On/off control with immediate effect. NO: If the change needs an explicit save, it is `checkbox`. If the choice is between several mutually exclusive options, it is `radio-button`. */
export interface NeoToggleProps extends Partial<Omit<SwitchProps, 'label' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange' | 'id' | 'aria-label' | 'inputRef' | 'className' | 'sx' | 'ref'>> {
  /** The visible text of the component. */
  label?: ReactNode;
  /** On. */
  checked?: boolean;
  /**  */
  defaultChecked?: boolean;
  /** Not interactive: it takes neither focus nor clicks. */
  disabled?: boolean;
  /** Notifies the value change. */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  /** The control id, to link the label and the descriptions. */
  id?: string;
  /** The accessible name when there is no visible text that provides it. */
  'aria-label'?: string;
  /** The ref to the `<input>` inside — to focus or read it. The root forwards `ref`; this one reaches the control. */
  inputRef?: Ref<unknown>;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoToggle: ForwardRefExoticComponent<NeoToggleProps & ({ label: ReactNode } | { 'aria-label': string } | { 'aria-labelledby': string }) & RefAttributes<HTMLElement>>;

/** Contextual informational label about the element that triggers it. NO: It does not replace a visible label and does not contain actions. If the information is needed to operate, it goes on the screen. If it is a system message, it is `alert`. */
export interface NeoTooltipProps extends Partial<Omit<TooltipProps, 'placement' | 'label' | 'className' | 'sx' | 'arrow' | 'ref'>> {
  /** where the bubble goes relative to the trigger — the vocabulary is MUI's, identical. `none` = no arrow, which in MUI is the default placement. Default: 'top'. */
  placement?: 'none' | 'right' | 'left' | 'bottom' | 'top' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** The visible text of the component. */
  label: ReactNode;
  /** Classes from the consumer. They merge with the component ones; they do not replace them. */
  className?: string;
  /** The MUI `sx`: per-instance styles, with access to the theme. */
  sx?: SxProps<Theme>;
}
export declare const NeoTooltip: ForwardRefExoticComponent<NeoTooltipProps & RefAttributes<HTMLElement>>;
