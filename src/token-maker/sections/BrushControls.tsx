import { Brush, Eraser, RotateCcw, Undo2 } from 'lucide-react';
import { Advanced, ControlLabel, SegmentedButtons, Slider, Toggle } from '../components';
import { BRUSH_MAX, BRUSH_MIN, DEFAULTS as TOOL_DEFAULTS, setBrush, setTool, useTool } from '../editor/tools';
import { updateDoc, useDoc } from '../state/tokenStore';

/** The erase/restore brush, shown under background removal. */
export function BrushControls() {
  const tool = useTool((s) => s.tool);
  const mode = useTool((s) => s.brushMode);
  const size = useTool((s) => s.brushSize);
  const softness = useTool((s) => s.brushSoftness);
  const usePressure = useTool((s) => s.usePressure);
  const showRemoved = useTool((s) => s.showRemoved);
  const strokeCount = useDoc((d) => d.art.strokes.length);
  const on = tool === 'brush';

  return (
    <div className="control-group">
      <h4 className="control-group__title">Erase / restore brush</h4>
      <div className="control" data-control="brush" data-help-id="image.brush">
        <ControlLabel label="Brush" helpId="image.brush" />
        <button type="button" className={`btn btn--wide${on ? ' btn--primary' : ''}`} aria-pressed={on} onClick={() => setTool(on ? 'move' : 'brush')}>
          <Brush size={18} aria-hidden="true" />
          {on ? 'Brush on: paint on the picture' : 'Use the brush'}
        </button>
      </div>
      <SegmentedButtons
        label="Brush does"
        helpId="image.brushMode"
        value={mode}
        onChange={(m) => setBrush({ brushMode: m })}
        options={[
          { value: 'erase', label: 'Erase', icon: <Eraser size={16} /> },
          { value: 'restore', label: 'Restore', icon: <Undo2 size={16} /> },
        ]}
      />
      <Slider
        label="Brush size"
        helpId="image.brushSize"
        unit="px"
        defaultValue={TOOL_DEFAULTS.brushSize}
        min={BRUSH_MIN}
        max={BRUSH_MAX}
        value={size}
        onChange={(v) => setBrush({ brushSize: v })}
      />
      <Advanced helpId="image.brushAdvanced">
        <Slider
          label="Softness"
          helpId="image.brushSoftness"
          unit="%"
          defaultValue={TOOL_DEFAULTS.brushSoftness}
          min={0}
          max={100}
          value={softness}
          onChange={(v) => setBrush({ brushSoftness: v })}
        />
        <Toggle label="Pen pressure" helpId="image.pressure" checked={usePressure} onChange={(v) => setBrush({ usePressure: v })} />
        <Toggle label="Show removed parts in red" helpId="image.showRemoved" checked={showRemoved} onChange={(v) => setBrush({ showRemoved: v })} />
      </Advanced>
      <button
        type="button"
        className="btn btn--ghost btn--small"
        disabled={!strokeCount}
        onClick={() => updateDoc((d) => ({ ...d, art: { ...d.art, strokes: [] } }))}
      >
        <RotateCcw size={16} aria-hidden="true" />
        Clear brush strokes
      </button>
    </div>
  );
}
