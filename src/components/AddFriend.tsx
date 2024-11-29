import { useState } from "react";
import SearchComponent from "./SearchBar";

export default function AddFriend() {
  const [friendSearch, setFriendSearch] = useState('');

  let resultStr = "";

  return (
    <div style={{ width: "100%", height: "130px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10px" }}>
      <div className="flex flex-col w-[100%] h-[100%] rounded-2xl bg-white/[0.6] text-black p-4">
        <h3 className='font-semibold'>Add Friend</h3>
        <SearchComponent placeholder="Username" onChange={(event: any) => {
          setFriendSearch(event.target.value);
        }} />
        <span style={{ paddingTop: "10px" }}>
          {resultStr}
        </span>
      </div>
    </div>
  );
}