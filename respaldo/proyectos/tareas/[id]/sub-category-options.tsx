'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import fetcher from '@/services/fetcher'
import { ProjectTaskGroupInfo, TasksAndSubCategories } from './types'
import useSWR from 'swr'
import { ChangeEvent, useState } from 'react'
import { cn } from '@/lib/utils'

interface SubCategoryOptionsProps {
  id: string
}

const SubCategoryOptions = ({ id }: SubCategoryOptionsProps) => {
  const [projectTaskGroupInfos, setProjectTaskGroupInfos] = useState<
    ProjectTaskGroupInfo[]
  >([])
  const { data, isLoading } = useSWR(
    `${process.env.API_URL}/Project/GetTasksAndSubcategories/${id}`,
    fetcher,
  )
  const tasksAndSubCategories: TasksAndSubCategories = data?.result || {}

  const handleChangeProjectTaskGroup = (id: number) => {
    const projectTaskGroupInfosFiltered =
      tasksAndSubCategories.projectTaskGroupInfos.filter(
        (el: ProjectTaskGroupInfo) => el.mtSubCategoryActionId === id,
      )

    setProjectTaskGroupInfos(projectTaskGroupInfosFiltered)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(projectTaskGroupInfos)
  return (
    <Card className="">
      <CardHeader className="w-[50%] min-w-[350px]">
        <CardTitle>Subcategorías</CardTitle>
        <CardDescription>Escoja una subcategoría</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-[50%] min-w-[350px] flex-col space-y-1.5 pt-4">
          <Label htmlFor="subcategoria">Subcategorías</Label>
          <Select
            onValueChange={(value: string) => {
              handleChangeProjectTaskGroup(Number(value))
            }}
          >
            <SelectTrigger id="subcategoria">
              <SelectValue placeholder="Escoja subcategoría" />
            </SelectTrigger>
            <SelectContent position="popper">
              {tasksAndSubCategories.mtSubCategories.map((sub) => (
                <SelectItem key={sub.id} value={sub.id.toString()}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {
          <Card className="w-[380px]">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {projectTaskGroupInfos.map((task, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {task.mtSubCategoryActionId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {task.mtSpecialtyActionId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        }
      </CardContent>
    </Card>
  )
}

export default SubCategoryOptions
