import React from 'react'
import CompanyList from './List'
import { useGo } from '@refinedev/core'
import { useSelect } from '@refinedev/antd'
import { useModalForm } from '@refinedev/antd';
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations';
import { Form, Input, Modal, Select } from 'antd';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import SelectOptionWithAvatar from '@/components/SelectOptionWithAvatar';
import { GetFields } from '@refinedev/nestjs-query';
import { UsersSelectQuery } from '@/graphql/types';
function CreateCompany() {
  const go = useGo();

  const goToListPage = () => {
    go({
      to : { resource : 'companies', action : "list"},
      options : { keepQuery : true},
      type : 'replace'
    })
  }

  const { formProps, modalProps } = useModalForm({
    action : 'create',
    defaultVisible : true,
    resource : 'companies',
    redirect : false,
    mutationMode : "pessimistic",
    onMutationSuccess : goToListPage,
    meta : {
      gqlMutation : CREATE_COMPANY_MUTATION
    }
  })

  const { selectProps, queryResult } = useSelect<GetFields<UsersSelectQuery>>({
    resource : 'users',
    optionLabel : 'name',
    meta :  {
      gqlQuery : USERS_SELECT_QUERY
    } 
  })
  return (
    <CompanyList>
      <Modal 
      {...modalProps}
      mask={true}
      onCancel={goToListPage}
      title="Create Company"
      width={512}
      >
        <Form {...formProps} layout='vertical'>
          <Form.Item
          label="Company Name"
          name="name"
          rules={[{required : true}]}
          >
            <Input placeholder='Please Input a Company Name'/>
          </Form.Item>

          <Form.Item
          label="Sales Owner"
          name="salesOwnerId"
          rules={[{required : true}]}
          >
            <Select {...selectProps}
            options={
              queryResult.data?.data.map((user) => ({
                value : user.id,
                label : (
                  <SelectOptionWithAvatar
                  name={user.name}
                  avatarUrl={user.avatarUrl ?? undefined}
                  />
                )
              })) ?? []
            }
            placeholder='Please Select a Sales Owner'/>
          </Form.Item>
        </Form>

      </Modal>
    </CompanyList>
  )
} 

export default CreateCompany
