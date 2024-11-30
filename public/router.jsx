import { createBrowserRouter } from "react-router-dom";
import Patients from "./Patients";
import AddCondition from "./AddCondition";

const router = createBrowserRouter([

    {
        path:  "/patients/:id",
        element: <Patients />
    },
    {
        path: "/addCondition",
        element: <AddCondition/>
    }
])

export default router