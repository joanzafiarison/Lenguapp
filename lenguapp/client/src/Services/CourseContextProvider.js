import React ,{useContext,useReducer,createContext} from "react";

const CourseContext = createContext(null);

const CourseDispatchContext = createContext(null);


export function CourseProvider({ children }) {

  const [courses, dispatch] = useReducer(
    courseReducer,
    initialCourse
  );
  return (
    <CourseContext.Provider value={courses}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  );
}


export function useCourse() {
    return useContext(CourseContext);
  }
  
export function useCourseDispatch() {
    console.log("course dispatch used")
    return useContext(CourseDispatchContext);
}


function courseReducer(course,action){
    console.log("in courseReducer",action.type)
    switch(action.type){
        case 'added' : {
            return [...course,{
                id : action.id,
                text : action.text
            }];
        }
        case 'updateMeta' : {
            console.log(action)
            return [...course,{
                name : action.name,
            }];
        }
        case 'nextStep':{
            return {step : action.step} 
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


const initialCourse = {
    "step" :0
};
/*
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }*/