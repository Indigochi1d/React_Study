import React, { useCallback } from "react";
import Counter from "../components/Counter";
import { connect, useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../modules/counter";
import { bindActionCreators } from "redux";
const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};
const mapStateToProps = (state) => ({
  number: state.counter.number,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      increase,
      decrease,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

//Hooks ver.
const CounterContainerHooks = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase(), [dispatch]));
  const onDecrease = useCallback(() => dispatch(decrease(), [dispatch]));
  return (
    <Counter
      number={number}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  );
};

export {CounterContainerHooks};
