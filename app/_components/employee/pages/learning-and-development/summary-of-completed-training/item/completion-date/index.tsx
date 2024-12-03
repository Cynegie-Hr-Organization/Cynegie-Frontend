import Phrase from './phrase';
import Date from './date';

const ItemCompletionDate: React.FC<{ phrase: string; date: string }> = ({
  phrase,
  date,
}) => {
  return (
    <div>
      <Phrase text={phrase} /> <Date text={date} />
    </div>
  );
};

export default ItemCompletionDate;
