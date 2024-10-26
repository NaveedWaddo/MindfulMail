import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "../../../components/ui/tooltip";
import { Props } from "next/script";

type Props = {
  defoultLayout: number[] | undefined;
  navCollapsedSize: number;
};

const Mail = ({ defaultLayout = [20, 32, 48] }: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          console.log(sizes);
        }}
        className="h-full min-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
        ></ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Mail;
