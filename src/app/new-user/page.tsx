"use client"
import { useState } from "react";
import ChildJoinFamily from "~/components/ui/new-user-flow/childJoin";
import CreateFamily from "~/components/ui/new-user-flow/familyCreate";
import ParentComplete from "~/components/ui/new-user-flow/parentComplete";
import RoleSelect from "~/components/ui/new-user-flow/roleSelect";


export default function NewUserFlow() {
    const [flowStage, setFlowStage] = useState("role-select")

    return (
        <>
            <h1 className="text-center text-3xl font-bold">Welcome to Odyssey!</h1>

            {flowStage === "role-select" ? <RoleSelect setFlowStage={setFlowStage} /> : null}
            {flowStage === "child-join-family" ? <ChildJoinFamily setFlowStage={setFlowStage} /> : null}
            {flowStage === "parent-create-family" ? <CreateFamily setFlowStage={setFlowStage} /> : null}
            {flowStage === "parent-complete" ? <ParentComplete /> : null}
        </>
    )
}
