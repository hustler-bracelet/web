import "./button.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<Props> = ({ text, ...attrs }) => {
  return (
    <button className="default-button" {...attrs}>
      <p className="default-button_text">{text}</p>
    </button>
  );
};
export default Button;
