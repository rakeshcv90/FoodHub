import { navigationRef } from "./NavigationUtil"


const getCurrentRoute = (screenName: string) => navigationRef?.current?.getCurrentRoute()?.name == screenName

export default getCurrentRoute