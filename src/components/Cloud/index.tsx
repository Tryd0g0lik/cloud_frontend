import React, {JSX, useState} from "react";
import { NavbarTopFC } from "../NavbarTop";
interface Maintitle { maintitle: string }
export function CloudFC(maintitle: Maintitle ): JSX.Element{
  
  return(<>
    <NavbarTopFC {...maintitle} />
  </>);
}
