import Ad from "./Ad";
import FriendRequests from "./FriendRequests";
import Notifications from "./Notifications";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ user }) => {
  return (
    <div className=" flex flex-col gap-6">
      {user ? (
        <>
          <UserInfoCard user={user} />
          <UserMediaCard userId={user._id} />
        </>
      ) : (
        <>
          <FriendRequests basic />
          <Notifications />
        </>
      )}

      <Ad />
    </div>
  );
};

export default RightMenu;
