import './ReportButton.css';

function ReportButton({ title, img }) {
	return (
		<button className='RoundedRect ImageButton'>
			<div className='imageTextContainer Reports'>
				<img src={img} />
				<div>
					<h4>{title}</h4>
				</div>
			</div>
		</button>
	);
}

export default ReportButton;
