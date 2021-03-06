import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { renderRoutes } from 'react-router-config';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const LayoutAdminRoute = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <section className="logo"></section>
        <Menu theme="dark" defaultOpenKeys={['/' + pathname.split('/')[1]]} defaultSelectedKeys={[pathname]} mode="inline">
          {
            props.route.routes && props.route.routes.map((item: any) => {
              if (item.routes) {
                return (
                  <SubMenu key={item.path} title={item.name}>
                    {
                      item.routes.map((subItem: any) => {
                        return subItem.name && subItem.icon &&
                          <Menu.Item key={subItem.path} icon={subItem.icon && <subItem.icon />}>
                            <Link to={subItem.path}>{subItem.name}</Link>
                          </Menu.Item>
                      })
                    }
                  </SubMenu>
                )
              }

              return (
                <Menu.Item key={item.path} icon={item.icon && <item.icon />}>
                  <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <section className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {renderRoutes(props.route.routes)}
          </section>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy;2020 Power By Zhangxu</Footer>
      </Layout>
    </Layout>
  )
}