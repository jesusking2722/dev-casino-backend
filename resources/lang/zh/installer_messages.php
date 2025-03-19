<?php

return array (
  'title' => 'Laravel 安装程序',
  'next' => '下一步',
  'back' => '上一步',
  'finish' => '安装',
  'forms' => 
  array (
    'errorTitle' => '发生以下错误：',
  ),
  'welcome' => 
  array (
    'templateTitle' => '欢迎',
    'title' => 'Laravel 安装程序',
    'message' => '简单的安装和设置向导。',
    'next' => '检查要求',
  ),
  'requirements' => 
  array (
    'templateTitle' => '步骤 1 | 服务器要求',
    'title' => '服务器要求',
    'next' => '检查权限',
  ),
  'permissions' => 
  array (
    'templateTitle' => '步骤 2 | 权限',
    'title' => '权限',
    'next' => '配置环境',
  ),
  'environment' => 
  array (
    'menu' => 
    array (
      'templateTitle' => '步骤 3 | 环境设置',
      'title' => '环境设置',
      'desc' => '请选择您想要配置应用的 <code>.env</code> 文件的方式。',
      'wizard-button' => '表单向导设置',
      'classic-button' => '经典文本编辑器',
    ),
    'wizard' => 
    array (
      'templateTitle' => '步骤 3 | 环境设置 | 指导向导',
      'title' => '指导 <code>.env</code> 向导',
      'tabs' => 
      array (
        'environment' => '环境',
        'database' => '数据库',
        'application' => '应用',
      ),
      'form' => 
      array (
        'name_required' => '环境名称是必需的。',
        'app_name_label' => '应用名称',
        'app_name_placeholder' => '应用名称',
        'app_environment_label' => '应用环境',
        'app_environment_label_local' => '本地',
        'app_environment_label_developement' => '开发',
        'app_environment_label_qa' => '测试',
        'app_environment_label_production' => '生产',
        'app_environment_label_other' => '其他',
        'app_environment_placeholder_other' => '输入您的环境...',
        'app_debug_label' => '应用调试',
        'app_debug_label_true' => '是',
        'app_debug_label_false' => '否',
        'app_log_level_label' => '应用日志级别',
        'app_log_level_label_debug' => '调试',
        'app_log_level_label_info' => '信息',
        'app_log_level_label_notice' => '通知',
        'app_log_level_label_warning' => '警告',
        'app_log_level_label_error' => '错误',
        'app_log_level_label_critical' => '严重',
        'app_log_level_label_alert' => '警报',
        'app_log_level_label_emergency' => '紧急',
        'app_url_label' => '应用 URL',
        'app_url_placeholder' => '应用 URL',
        'db_connection_failed' => '无法连接到数据库。',
        'db_connection_label' => '数据库连接',
        'db_connection_label_mysql' => 'mysql',
        'db_connection_label_sqlite' => 'sqlite',
        'db_connection_label_pgsql' => 'pgsql',
        'db_connection_label_sqlsrv' => 'sqlsrv',
        'db_host_label' => '数据库主机',
        'db_host_placeholder' => '数据库主机',
        'db_port_label' => '数据库端口',
        'db_port_placeholder' => '数据库端口',
        'db_name_label' => '数据库名称',
        'db_name_placeholder' => '数据库名称',
        'db_username_label' => '数据库用户名',
        'db_username_placeholder' => '数据库用户名',
        'db_password_label' => '数据库密码',
        'db_password_placeholder' => '数据库密码',
        'app_tabs' => 
        array (
          'more_info' => '更多信息',
          'broadcasting_title' => '广播、缓存、会话和队列',
          'broadcasting_label' => '广播驱动',
          'broadcasting_placeholder' => '广播驱动',
          'cache_label' => '缓存驱动',
          'cache_placeholder' => '缓存驱动',
          'session_label' => '会话驱动',
          'session_placeholder' => '会话驱动',
          'queue_label' => '队列驱动',
          'queue_placeholder' => '队列驱动',
          'redis_label' => 'Redis 驱动',
          'redis_host' => 'Redis 主机',
          'redis_password' => 'Redis 密码',
          'redis_port' => 'Redis 端口',
          'mail_label' => '邮件',
          'mail_driver_label' => '邮件驱动',
          'mail_driver_placeholder' => '邮件驱动',
          'mail_host_label' => '邮件主机',
          'mail_host_placeholder' => '邮件主机',
          'mail_port_label' => '邮件端口',
          'mail_port_placeholder' => '邮件端口',
          'mail_username_label' => '邮件用户名',
          'mail_username_placeholder' => '邮件用户名',
          'mail_password_label' => '邮件密码',
          'mail_password_placeholder' => '邮件密码',
          'mail_encryption_label' => '邮件加密',
          'mail_encryption_placeholder' => '邮件加密',
          'pusher_label' => 'Pusher',
          'pusher_app_id_label' => 'Pusher 应用 ID',
          'pusher_app_id_palceholder' => 'Pusher 应用 ID',
          'pusher_app_key_label' => 'Pusher 应用密钥',
          'pusher_app_key_palceholder' => 'Pusher 应用密钥',
          'pusher_app_secret_label' => 'Pusher 应用密钥',
          'pusher_app_secret_palceholder' => 'Pusher 应用密钥',
        ),
        'buttons' => 
        array (
          'setup_database' => '设置数据库',
          'setup_application' => '设置应用',
          'install' => '安装',
        ),
      ),
    ),
    'classic' => 
    array (
      'templateTitle' => '步骤 3 | 环境设置 | 经典编辑器',
      'title' => '经典环境编辑器',
      'save' => '保存 .env',
      'back' => '使用表单向导',
      'install' => '保存并安装',
    ),
    'success' => '您的 .env 文件设置已保存。',
    'errors' => '无法保存 .env 文件，请手动创建。',
  ),
  'install' => '安装',
  'installed' => 
  array (
    'success_log_message' => 'Laravel 安装程序成功安装于 ',
  ),
  'final' => 
  array (
    'title' => '安装完成',
    'templateTitle' => '安装完成',
    'finished' => '应用程序已成功安装。',
    'migration' => '迁移 &amp; 种子控制台输出：',
    'console' => '应用程序控制台输出：',
    'log' => '安装日志条目：',
    'env' => '最终 .env 文件：',
    'exit' => '点击此处退出',
  ),
  'updater' => 
  array (
    'title' => 'Laravel 更新程序',
    'welcome' => 
    array (
      'title' => '欢迎使用更新程序',
      'message' => '欢迎来到更新向导。',
    ),
    'overview' => 
    array (
      'title' => '概述',
      'message' => '有 1 个更新。|有 :number 个更新。',
      'install_updates' => '安装更新',
    ),
  ),
);
