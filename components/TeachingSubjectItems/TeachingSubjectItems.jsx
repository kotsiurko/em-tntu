import React from "react";
import Link from "next/link";
import { getCourseId } from "lib/helpers";

function TeachingSubjectItems({ list }) {
  return list.map((el) => (
    <li key={el._key}>
      {el.teachingSubjectURL && (
        <Link href={el.teachingSubjectURL}>
          {el.teachingSubjectName} - ID: {getCourseId(el.teachingSubjectURL)}
        </Link>
      )}
      {!el.teachingSubjectURL && <>{el.teachingSubjectName}</>}
    </li>
  ));
}

export default TeachingSubjectItems;
