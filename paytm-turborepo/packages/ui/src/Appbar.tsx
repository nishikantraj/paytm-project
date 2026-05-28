
import { Button } from "./button";

export const Appbar = ({
    user,
    onSignin,
    onSignout
}:any)=>{

    return (
        <div className="flex border-b justify-between p-4">
            <div className="text-lg font-semibold text-sky-500">PayTm</div>
            <div>
                <Button onClick={user? onSignout : onSignin}>{user? "Logout": "Login"}</Button>
            </div>   
        </div>
    );
}