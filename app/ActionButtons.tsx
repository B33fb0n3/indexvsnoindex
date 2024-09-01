'use client'

import {Button} from "@/components/ui/button";
import {addAllToDB, addOne} from "@/app/actions";
import {useState} from "react";

export default function ActionButtons() {
    const [lastInsertTiming, setLastInsertTiming] = useState<{
        insertNoIndexTime?: string
        insertWithIndexTime?: string
    }>({});

    return (
        <div>
            <div>

            <Button onClick={async () => {
                const result = await addOne();
                setLastInsertTiming(result);
            }}>Add one to random</Button>
            <Button onClick={() => addAllToDB()}>Seed</Button>
            </div>
            <div>
                <h2 className={"text-xl font-medium"}>Last Insert took:</h2>
                <p>No index: {lastInsertTiming.insertNoIndexTime ?? "-"}ms</p>
                <p>With index: {lastInsertTiming.insertWithIndexTime ?? "-"}ms</p>
            </div>
        </div>
    )
}