import Ad from "./Ad";
import FriendRequests from "./FriendRequests";
import Notifications from "./Notifications";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ userId }) => {
  return (
    <div className=" flex flex-col gap-6">
      {userId ? (
        <>
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </>
      ) : null}
      <FriendRequests />
      <Notifications />
      <Ad />
    </div>
  );
};

export default RightMenu;
