
export const getSubject = async (subjectId, subjectState, getSubjectFunction)=>{
    console.log(subjectState);
    if(!subjectState || !subjectState.cur) {
        const res = await getSubjectFunction();
        // handle error
        if(!res || !res.cur) return res;
    }

    return subjectState?.cur?.find(
        sub=>sub?.cur?.common_id === subjectId
    );
}