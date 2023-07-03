import { Glyph } from '../types/glyph';

type Props = {
  glyph: Glyph;
};

const BookCard: React.FC<Props> = ({ glyph }) => {
  return (
    <div style={{ backgroundColor: 'aliceblue', margin: 20 }}>
      <div style={{ display: 'flex' }}>
        {Object.entries(glyph).map(([key, value]) => (
          <div key={key} style={{ paddingRight: 5 }}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
