import "./title.css";

type Props = {
  size: "big" | "default" | "sub";
  title: string;
  bold?: boolean;
};

const Title: React.FC<Props> = ({ size = "default", title, bold = false }) => {
  return (
    <div className="title_container">
      {size === "big" && <h1 className="title_big">{title}</h1>}
      {size === "default" && (
        <p
          className="title_default"
          style={{ fontWeight: bold ? "bold" : "500" }}
        >
          {title}
        </p>
      )}
      {size === "sub" && (
        <p className="title_sub" style={{ fontWeight: bold ? "bold" : "500" }}>
          {title}
        </p>
      )}
    </div>
  );
};

export default Title;
