import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";
import { Particles } from "@/components/magicui/particles";

type PageProps = {
  params: Promise<{ quesId: string; quesName: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { quesId } = await params;
  const question = await databases.getDocument(db, questionCollection, quesId);

  return (
    <div>
      <Particles
        className="fixed inset-0 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />
      <div className="flex justify-center items-center">
        <EditQues question={question} />
      </div>
    </div>
  );
};

export default Page;
