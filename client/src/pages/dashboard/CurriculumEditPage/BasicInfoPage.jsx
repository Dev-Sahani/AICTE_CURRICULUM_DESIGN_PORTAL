import { useParams } from "react-router-dom";
import { 
  CourseTextArea, 
  CourseDropdown, 
  Label, 
  AddCourseInput, 
  Loading, 
} from "../../../components";
import { getAllLevels, getAllProgrammes } from "../../../utils/getAllProgramAndLevels";
import { useCourseContext } from "../../../context";
import { useEffect, useState } from "react";

export default function BasicInfoPage() {
  const {common_id} = useParams();
  const { getCourse, level, program } = useCourseContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getCourse(common_id)
      .then((res)=>{
        // handle inappropriate response
        if(!res) return;
      })
      .catch(err=>{
        // Handle Error ??
      })
      .finally(()=>{
        setLoading(false);
      })
  // eslint-disable-next-line
  }, []);

  if(loading) return (
    <>
      <Loading count={1} cardClassName="w-[40%] h-8" />
      <Loading count={2} />
      <Loading count={2} containerClassName="w-[60%] !flex-row" cardClassName="!h-12" />
      <Loading count={1} cardClassName="w-[40%] h-8" />
      <Loading count={2} />
    </>
  )
  return (
    <div>
      <Label breakLine={true} className="!w-32">Course Title</Label>
      <CourseTextArea
        name="title"
        placeholder="Enter Course name..."
        className="w-[90%]"
      />
      
      <div className="flex gap-6 my-4 items-center">
        {
          level && level.cur && 
          <div>
            <Label>Level</Label>
            <CourseDropdown
              className="w-fit"
              name="level"
              defaultValue={level}
              list={getAllLevels}
            />
          </div>
        }
        {
          program && program.cur && 
          <div>
            <Label>Program</Label>
            <CourseDropdown
              className="w-fit"
              name="program"
              defaultValue={program}
              list={getAllProgrammes}
            />
          </div>
        }
      </div>

      <div className="flex gap-6 my-4 items-center">
      </div>

      <Label large breakLine className="mt-6">Message</Label>
      <CourseTextArea
        name="message"
        className="w-[90%] h-full min-h-[8rem]"
      />

      <Label large breakLine className="w-48 mt-6">Preface</Label>
      <CourseTextArea
        name="preface"
        propertyName="preface"
        className="w-[90%] min-h-[8rem] "
      />

      <Label large breakLine className="w-48 mt-6">Acknowledgement</Label>
      <CourseTextArea
        name="acknowledgement"
        propertyName="acknowledgement"
        className="w-[90%] min-h-[8rem] "
      />

      <div className="flex justify-start gap-8 mt-8">
        <Label large breakLine className="w-auto">Range of Credit</Label>
        <CourseTextArea
          name="rangeOfCredits"
          propertyName="rangeOfCredits"
          className="!w-auto h-10"
        />
      </div>

      <AddCourseInput
        name="definitionOfCredits"
        propertyName="definitionOfCredits"
        propertyKeys={["activity", "overallCredits"]}
        className="w-[90%] min-h-[6rem] ml-8 grid grid-cols-2 gap-6"
      />

      <AddCourseInput
        name="codesAndDef"
        propertyName="codesAndDef"
        propertyKeys={["code", "definition"]}
        className="w-[90%] min-h-[6rem] ml-8 grid grid-cols-2 gap-6"
      />
    </div>
  )
}
