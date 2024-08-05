"use client"
import { useState } from "react";
import CreateFamily from "~/components/ui/new-user-flow/familyCreate";
import RoleSelect from "~/components/ui/new-user-flow/roleSelect";


export default function NewUserFlow() {
    const [flowStage, setFlowStage] = useState("role-select")

    return (
        <>
            <h1 className="text-center text-3xl font-bold">Welcome to Odyssey!</h1>

            {flowStage === "role-select" ? <RoleSelect setFlowStage={setFlowStage} /> : null}
            {flowStage === "parent-create-family" ? <CreateFamily /> : null}
        </>
    )
}
