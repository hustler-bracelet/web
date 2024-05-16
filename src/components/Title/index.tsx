import "./title.css";

type Props = {
  big?: boolean;
  title: string;
  bold?: boolean;
};

const Title: React.FC<Props> = ({ big = false, title, bold = false }) => {
  return (
    <div className="container">
      {big ? (
        <h1 className="title_big">{title}</h1>
      ) : (
        <p
          className="title_default"
          style={{ fontWeight: bold ? "bold" : "500" }}
        >
          {title}
        </p>
      )}
    </div>
  );
};

export default Title;
