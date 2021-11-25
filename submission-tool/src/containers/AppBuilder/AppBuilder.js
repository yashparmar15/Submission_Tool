import React from 'react';
import { Layout, Breadcrumb, PageHeader, Affix } from 'antd';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import "./AppBuilder.css"

const { Header, Content, Footer} = Layout;

class AppBuilder extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationBar collapsed = {this.state.collapsed} onCollapse = {this.onCollapse}/>
        <Layout className="site-layout">
          <Affix>
          <Header className="site-layout-background" style={{ padding: 0 }}>
          <PageHeader
            className="site-page-header"
            onBack={() => window.history.back()}
            title= {this.props.heading}
          />
          </Header>
          </Affix>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {this.props.content}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Yash Parmar ©2021</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AppBuilder;