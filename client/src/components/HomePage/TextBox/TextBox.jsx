import './TextBox.css';
import TextareaAutosize from 'react-textarea-autosize';

function TextBox({ placeHolder, prevContent, onEditField, secStyle }) {
	console.log(secStyle);
	return (
		<TextareaAutosize
			type='text'
			className={`TextBox ${secStyle}`}
			placeholder={placeHolder}
			onChange={onEditField}
			defaultValue={prevContent}
		></TextareaAutosize>
	);
}

export default TextBox;
