import { DECORATION_PICTURES, decorationLook, EFFECT_PICTURES } from './pictureLibrary';

describe('decorationLook', () => {
  it('gives decoration pictures their own look', () => {
    const p = DECORATION_PICTURES[0]!;
    expect(decorationLook(p.id)).toMatchObject({ name: p.name, color: p.color, tint: p.tint });
  });

  it('lets every effect picture be a decoration, tinted with its starting colour', () => {
    for (const fx of EFFECT_PICTURES) {
      expect(decorationLook(fx.id)).toEqual({ name: fx.name, color: fx.defaults.color, swatches: fx.swatches, tint: true });
    }
  });

  it('knows nothing of other pictures', () => {
    expect(decorationLook('nope')).toBeUndefined();
  });
});
