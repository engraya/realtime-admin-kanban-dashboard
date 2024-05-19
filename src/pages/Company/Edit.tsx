import CustomAvatar from '@/components/CustomAvatar'
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations'
import { getNameInitials } from '@/utilities'
import { Edit, useForm } from '@refinedev/antd'
import { Row, Col, Select, InputNumber, Input } from 'antd'
import {Form} from 'antd'
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import SelectOptionWithAvatar from '@/components/SelectOptionWithAvatar';
import { GetFields } from '@refinedev/nestjs-query';
import { UsersSelectQuery } from '@/graphql/types';
import { useSelect } from '@refinedev/antd'
import { businessTypeOptions, companySizeOptions, industryOptions } from '@/constants'
import { CompanyContactsTable } from './ContactTable'

function EditCompany() {

    const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
        redirect : false,
        meta : {
            gqlMutation : UPDATE_COMPANY_MUTATION
        }
    })
    const { avatarUrl, name } = queryResult?.data?.data || {};

    const { selectProps, queryResult : queryResultUsers } = useSelect<GetFields<UsersSelectQuery>>({
        resource : 'users',
        optionLabel : 'name',
        pagination : {
            mode : 'off'
        },
        meta :  {
          gqlQuery : USERS_SELECT_QUERY
        } 
      })
  return (
    <div>
        <Row gutter={[32, 32]}>
            <Col xs={24} xl={12}>

            <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps} 
            breadcrumb={false}
            >
            <Form {...formProps} layout='vertical'>
                <CustomAvatar shape='square'
                 src={avatarUrl} name={getNameInitials(name || '')} 
                 style={{width : 96, height : 96, marginBottom : '24px'}}/>

        <Form.Item
          label="Sales Owner"
          name="salesOwnerId"
          initialValue={formProps?.initialValues?.salesOwner?.id}
          >
            <Select {...selectProps}
            options={
                queryResultUsers.data?.data.map((user) => ({
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
          <Form.Item>
            <Select options={companySizeOptions} placeholder='Select Company Size'/>
          </Form.Item>
          <Form.Item>
            <InputNumber
            autoFocus
            addonBefore="$"
            min={0}
            placeholder='0.00'
            />
          </Form.Item>
          <Form.Item label="Industry">
            <Select options={industryOptions}/>
          </Form.Item>
          <Form.Item label="Business Type">
            <Select options={businessTypeOptions}/>
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input placeholder='Country'/>
          </Form.Item>
          <Form.Item label="Website" name="webiste">
          <Input placeholder='Website'/>
          </Form.Item>
            </Form>
            </Edit>
            </Col>
            <Col xs={24} xl={12}>
            <CompanyContactsTable/>
            </Col>
        </Row>
    </div>
  )
}

export default EditCompany
