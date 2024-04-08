import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "../components/User";
import { Preloader } from "../lib/PreloadContext";
import { getUser } from "../modules/users";

const UserContainer = ({ id }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id === parseInt(id, 10)) return;   //사용자가 존재하고 id가 일치할 때 요청 X
    dispatch(getUser(id));
  }, [dispatch, id, user]);     //id가 바뀔때마다 요청

  //컨테이너 유효성 검사 후 return null을 해야하는 경우에 null대신 Preloader 반환
  if (!user) {
    return <Preloader resolve={() => dispatch(getUser(id))} />;
  }
  return <User user={user}/>
};

export default UserContainer;
