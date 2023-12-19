import FilterSearch from '../../../components/FilterSearch'
import FilterDropdown from '../../../components/FilterDropdown'
import { getAllLevels, getAllProgrammes } from "../../../utils/getAllProgramAndLevels";

export default function TemplatePageFilter() {

  return (
    <nav className="w-full flex justify-evenly my-2">
        <FilterSearch 
            name="courseSearch"
            placeholder={"Enter Course Name"}
        />
        <FilterDropdown
          name="courseLevel"
          defaultValue="Select"
          list={getAllLevels}
        />
        <FilterDropdown
          name="courseProgram"
          defaultValue="Select"
          list={getAllProgrammes}
        />
    </nav>
  )
}
