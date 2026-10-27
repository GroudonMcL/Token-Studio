import type { ReactNode } from 'react';
import {
  Bookmark,
  Contrast,
  Download,
  Frame,
  Gem,
  ImagePlus,
  Maximize2,
  Mountain,
  Ruler,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Tag,
  WandSparkles,
} from 'lucide-react';
import type { HelpId } from '../help/helpContent';

/** Panel sections. Since the tool rail (owner request) they are reached through the tabs below. */
export type SectionId =
  | 'import'
  | 'image'
  | 'cutout'
  | 'background'
  | 'lighting'
  | 'shadows'
  | 'popout'
  | 'effects'
  | 'frame'
  | 'decorations'
  | 'size'
  | 'label'
  | 'presets'
  | 'export';

export interface SectionDef {
  id: SectionId;
  title: string;
  helpId: HelpId;
  icon: ReactNode;
  /** One line shown in the empty placeholder until the section is built. */
  placeholder: string;
}

const icon = (C: typeof Download) => <C size={18} strokeWidth={1.75} />;

/** Every section, in the order the tabs show them. */
export const SECTIONS: readonly SectionDef[] = [
  { id: 'import', title: 'Import', helpId: 'section.import', icon: icon(ImagePlus), placeholder: 'Upload, drop, paste or link an image.' },
  { id: 'image', title: 'Image', helpId: 'section.image', icon: icon(SlidersHorizontal), placeholder: 'Adjustments.' },
  { id: 'cutout', title: 'Cut-out', helpId: 'section.cutout', icon: icon(Scissors), placeholder: 'Remove the picture’s own background and tidy its edges.' },
  { id: 'popout', title: 'Pop-out', helpId: 'section.popout', icon: icon(Maximize2), placeholder: 'Paint parts of the art over the border.' },
  { id: 'frame', title: 'Frame & shape', helpId: 'section.frame', icon: icon(Frame), placeholder: 'Shape, border style, colour and thickness.' },
  { id: 'background', title: 'Background', helpId: 'section.background', icon: icon(Mountain), placeholder: 'A colour, gradient or picture behind the art.' },
  { id: 'lighting', title: 'Lighting', helpId: 'section.lighting', icon: icon(Sun), placeholder: 'Light direction, colour and presets.' },
  { id: 'shadows', title: 'Shadows', helpId: 'section.shadows', icon: icon(Contrast), placeholder: 'Drop, pop-out and inner shadows.' },
  { id: 'effects', title: 'Effects', helpId: 'section.effects', icon: icon(Sparkles), placeholder: 'Glows, elements, conditions, atmosphere and overlays.' },
  { id: 'decorations', title: 'Decorations', helpId: 'section.decorations', icon: icon(Gem), placeholder: 'Gems, skulls, horns, wings and more.' },
  { id: 'label', title: 'Label', helpId: 'section.label', icon: icon(Tag), placeholder: 'Name banners, plaques, plain text and ring text.' },
  { id: 'size', title: 'Size', helpId: 'section.size', icon: icon(Ruler), placeholder: 'Tiny to Gargantuan, or a custom number of squares.' },
  { id: 'presets', title: 'Presets', helpId: 'section.presets', icon: icon(Bookmark), placeholder: 'Built-in styles, your saved styles and sharing.' },
  { id: 'export', title: 'Export', helpId: 'section.export', icon: icon(Download), placeholder: 'Format, resolution, download and copy.' },
];

export type TabGroup = 'Art' | 'Look' | 'Finish';

/**
 * The panel's tabs: the tool rail on the left on desktop and tablet, the
 * scrolling tab row of the bottom sheet on phones (owner's choice of layout
 * A). A tab with more than one section shows them one at a time.
 */
export interface PanelTab {
  id: string;
  label: string;
  group: TabGroup;
  icon: ReactNode;
  sections: SectionId[];
}

export const TAB_GROUPS: readonly TabGroup[] = ['Art', 'Look', 'Finish'];

export const PANEL_TABS: readonly PanelTab[] = [
  { id: 'picture', label: 'Picture', group: 'Art', icon: icon(ImagePlus), sections: ['import', 'image'] },
  { id: 'cutout', label: 'Cut-out', group: 'Art', icon: icon(Scissors), sections: ['cutout', 'popout'] },
  { id: 'frame', label: 'Frame', group: 'Look', icon: icon(Frame), sections: ['frame'] },
  { id: 'background', label: 'Background', group: 'Look', icon: icon(Mountain), sections: ['background'] },
  { id: 'lighting', label: 'Light', group: 'Look', icon: icon(Sun), sections: ['lighting'] },
  { id: 'shadows', label: 'Shadow', group: 'Look', icon: icon(Contrast), sections: ['shadows'] },
  { id: 'effects', label: 'Effects', group: 'Look', icon: icon(WandSparkles), sections: ['effects'] },
  { id: 'decor', label: 'Decor', group: 'Look', icon: icon(Gem), sections: ['decorations'] },
  { id: 'label', label: 'Label', group: 'Look', icon: icon(Tag), sections: ['label'] },
  { id: 'size', label: 'Size', group: 'Finish', icon: icon(Ruler), sections: ['size'] },
  { id: 'presets', label: 'Presets', group: 'Finish', icon: icon(Bookmark), sections: ['presets'] },
  { id: 'export', label: 'Export', group: 'Finish', icon: icon(Download), sections: ['export'] },
];

export const sectionById = (id: SectionId) => SECTIONS.find((s) => s.id === id)!;
export const tabById = (id: string) => PANEL_TABS.find((t) => t.id === id)!;
export const tabOfSection = (id: SectionId) => PANEL_TABS.find((t) => t.sections.includes(id))!;
