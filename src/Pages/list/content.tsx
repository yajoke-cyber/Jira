import  { memo } from "react";
import { useArray } from "utils";
export interface User{
  age:number,
  name:string
}
const List = memo(() => {
  const arr:User[]=[{age:12, name:'john'},{age:124, name:'axios'},{age:2, name:'web'}]
  const { value,
    add,
    clear,
    remove} = useArray(arr);
  return <div>
    <button onClick={()=>{add({age:12, name:'john'})}}>添加</button>
    <button onClick={()=>{remove(0)}}>删掉第0个</button>
    <button onClick={()=>{clear()}}>清屏</button>
    {value.map((data:User,index)=>{
      return <li key={index}>
        {index}{data.name}{data.age}
      </li>
    })}
    </div>;
});

export default List;
