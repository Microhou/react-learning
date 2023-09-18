import { useEffect } from "react";

function Child() {
    useEffect(() => {
        console.log('I am from Child');

    }, [])
    return <div>Child</div>;
}

export default Child;