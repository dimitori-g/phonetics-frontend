import { useEffect, useState } from 'react';
import fetchData from '../api/base';
import { Glyph } from '../types/glyph';
import { apiEndPoints } from '../data/api';
import GlyphCard from '../components/GlyphCard';

const Glyph = () => {
  const [glyph, setGlyph] = useState<Glyph[]>([]);
  const [error, setError] = useState('');

  const fetchGlyph = async () => {
    const glyphResponse = await fetchData(apiEndPoints.glyph);
    if (glyphResponse.status === 200) {
      setGlyph(glyphResponse.data);
    } else {
      setError(glyphResponse.message);
    }
  };

  useEffect(() => {
    fetchGlyph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!glyph.length) return <div>{error}</div>;

  return (
    <>
      <div>Glyphs</div>
      {glyph.map((glyph) => (
        <GlyphCard key={glyph.id} glyph={glyph}></GlyphCard>
      ))}
    </>
  );
};

export default Glyph;
