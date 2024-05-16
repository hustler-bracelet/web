import "./formatButton.css";
type Props = {
  icon: JSX.Element;
  func: Function;
};

const FormatButton: React.FC<Props> = ({ icon, func }) => {
  return (
    <button className="button" onClick={() => func()}>
      {icon}
    </button>
  );
};

export default FormatButton;
