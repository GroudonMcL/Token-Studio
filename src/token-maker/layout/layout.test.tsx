import { fireEvent, render, screen, within } from '@testing-library/react';
import { AdSlot } from './AdSlot';
import { AppShell } from './AppShell';
import { PANEL_TABS, SECTIONS } from './sections';

describe('AppShell (desktop)', () => {
  it('has a tool rail with the tabs in the order a token is made (layout A)', () => {
    render(<AppShell />);
    const rail = screen.getByRole('tablist', { name: 'Settings' });
    expect(rail).toHaveAttribute('aria-orientation', 'vertical');
    expect(within(rail).getAllByRole('tab').map((t) => t.textContent)).toEqual([
      'Picture',
      'Cut-out',
      'Frame',
      'Background',
      'Light',
      'Shadow',
      'Effects',
      'Decor',
      'Label',
      'Size',
      'Presets',
      'Export',
    ]);
    expect(PANEL_TABS.flatMap((t) => t.sections).sort()).toEqual(SECTIONS.map((s) => s.id).sort());
  });

  it('shows only the chosen tab in the panel', () => {
    render(<AppShell />);
    const panel = screen.getByRole('complementary', { name: 'Token settings' });
    // Picture holds two sections, one open at a time.
    expect(within(panel).getByRole('button', { name: 'Import' })).toHaveAttribute('aria-expanded', 'true');
    expect(within(panel).getByRole('button', { name: 'Image' })).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(within(panel).getByRole('button', { name: 'Image' }));
    expect(within(panel).getByRole('button', { name: 'Import' })).toHaveAttribute('aria-expanded', 'false');

    // A tab with one section shows it under a plain heading.
    fireEvent.click(screen.getByRole('tab', { name: 'Shadow' }));
    expect(screen.getByRole('tab', { name: 'Shadow' })).toHaveAttribute('aria-selected', 'true');
    expect(within(panel).getByRole('heading', { name: 'Shadows' })).toBeInTheDocument();
    expect(within(panel).queryByRole('button', { name: 'Import' })).toBeNull();
  });

  it('moves between tabs with the arrow keys', () => {
    render(<AppShell />);
    const first = screen.getByRole('tab', { name: 'Picture' });
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(screen.getByRole('tab', { name: 'Cut-out' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(first, { key: 'End' });
    expect(screen.getByRole('tab', { name: 'Export' })).toHaveAttribute('aria-selected', 'true');
  });

  it('keeps the menu style in the top bar’s panel settings', () => {
    render(<AppShell />);
    expect(screen.queryByRole('radiogroup', { name: 'Menu style' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Panel settings' }));
    expect(within(screen.getByRole('dialog', { name: 'Panel settings' })).getByRole('radiogroup', { name: 'Menu style' })).toBeInTheDocument();
  });

  it('has the top bar, toolbar and Export button', () => {
    const { container } = render(<AppShell />);
    expect(screen.getByRole('switch', { name: 'Batch' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Undo' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('toolbar', { name: 'Image tools' })).toBeInTheDocument();
    const bottomBar = container.querySelector<HTMLElement>('.bottom-bar')!;
    expect(within(bottomBar).getByRole('button', { name: 'Export PNG' })).toBeInTheDocument();
  });
});

describe('AdSlot', () => {
  it('is hidden while the feature flag is off', () => {
    render(<AdSlot />);
    expect(screen.queryByTestId('ad-slot')).toBeNull();
  });
  it('appears with a notice when switched on', () => {
    render(<AdSlot enabled />);
    expect(screen.getByText(/keep Token Maker free/)).toBeInTheDocument();
  });
});
