import React from 'react';
import {
	MdCheckBoxOutlineBlank,
	MdCheckBox,
	MdRemoveCircleOutline,
} from 'react-icons/md';
import './css/TodoListItem.scss';
import classNames from 'classnames';
const TodoListItem = ({ todo, onRemove,onToggle }) => {
	const { id, text, checked } = todo;
	return (
		<div className="TodoListItem">
			<div className={classNames('checkBox', { checked })} onClick={()=>onToggle(id)}>
				{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
				<div className="text">{text}</div>
			</div>
			<div
				className="remove"
				onClick={() => {
					onRemove(id);
				}}
			>
				<MdRemoveCircleOutline />
			</div>
		</div>
	);
};

export default TodoListItem;
