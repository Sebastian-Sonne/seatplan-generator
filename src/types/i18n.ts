export type I18nKeys = {
  siteTitle: string;
  screens: {
    addStudents: {
      title: string;
      heading: string;
      upload: {
        heading: string;
        dndArea: {
          instruction: string;
          format: string;
          onDrag: string;
        };
      };
      manual: {
        heading: string;
        placeholder: string;
        error: string;
      };
      added: {
        heading: string;
        noStudentsAddedMessage: string;
        totalStudents: string;
        showAll: string;
        continue: string;
        remove: string;
        removeAll: string;
      };
    };
    create: {
      title: string;
      heading: string;
      numberOfTables: string;
      numberOfStudents: string;
      create: string;
    };
    assign: {
      title: string;
      heading: string;
      dnd: {
        heading: string;
        autoAssign: string;
        clearAssign: string;
        allAssigned: string;
        dropHere: string;
      };
      shuffle: string;
    };
  };
  modals: {
    settings: {
      heading: string;
      theme: {
        heading: string;
        content: string;
        themes: {
          dark: string;
          light: string;
          system: string;
        };
      };
      language: {
        heading: string;
        content: string;
        requestLink: string;
      };
    };
    error: {
      heading: string;
      oops: string;
      supportString: string;
      mailToString: string;
      errors: {
        unKown: string;
        notEnoughDesks: string;
        noDesk: string;
        removeAllStudents: string;
        invalidShareData: string;
      }
    }
    export: {
      heading: string;
    };
  };
  components: {
    grid: {
      desk: string;
      row: string;
      col: string;
      toolTips: {
        remove: string;
        insert: string;
        select: string;
      };
    };
    export: {
      title: string;
      copiedToClipboard: string;
    };
  };
  common: {
    add: string;
    remove: string;
    submit: string;
    goBack: string;
    reset: string;
    export: string;
    na: string;
    copy: string;
    error: string;
    warning: string;
    cancel: string;
    done: string;
    escape: string
    continueAnyways: string;
  };
  messages: {
    newDomain: {
      title: string;
      content: string;
    };
  };
}
